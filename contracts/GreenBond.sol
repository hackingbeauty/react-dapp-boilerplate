pragma solidity 0.4.24;

import "@openzeppelin/contracts/zeppelin/ownership/Ownable.sol";
import "@openzeppelin/contracts/zeppelin/SafeMath.sol";
import "@openzeppelin/contracts/zeppelin/ERC20/BasicToken.sol";
import "@openzeppelin/contracts/interfaces/ISimpleBond.sol";

contract SimpleBond is ISimpleBond, Ownable {

   using SafeMath for uint256;

   string name;
   address tokenToRedeem;
   uint256 totalDebt;
   uint256 parDecimals;
   uint256 bondsNumber;
   uint256 cap;
   uint256 parValue;
   uint256 couponRate;
   uint256 term;
   uint256 timesToRedeem;
   uint256 loopLimit;
   uint256 nonce = 0;
   uint256 couponThreshold = 0;

   BasicToken token;

   mapping(uint256 => address) bonds;
   mapping(uint256 => uint256) maturities;
   mapping(uint256 => uint256) couponsRedeemed;
   mapping(address => uint256) bondsAmount;

   constructor(string _name, uint256 _par, uint256 _parDecimals, uint256 _coupon,
               uint256 _term, uint256 _cap, uint256 _timesToRedeem, address _tokenToRedeem,
               uint256 _loopLimit) {

     require(bytes(_name).length > 0);
     require(_coupon > 0);
     require(_par > 0);
     require(_term > 0);
     require(_loopLimit > 0);
     require(_timesToRedeem >= 1);

     name = _name;
     parValue = _par;
     cap = _cap;
     loopLimit = _loopLimit;
     parDecimals = _parDecimals;
     timesToRedeem = _timesToRedeem;
     couponRate = _coupon;
     term = _term;
     couponThreshold = term.div(timesToRedeem);

     if (_tokenToRedeem == address(0))
       tokenToRedeem = _tokenToRedeem;

     else
       token = BasicToken(_tokenToRedeem);

   }

   /**
   * @notice Change the number of elements you can loop through in this contract
   * @param _loopLimit The new loop limit
   */

   function changeLoopLimit(uint256 _loopLimit) public onlyOwner {

     require(_loopLimit > 0);

     loopLimit = _loopLimit;

   }

   /**
   * @notice Mint bonds to a new buyer
   * @param buyer The buyer of the bonds
   * @param _bondsAmount How many bonds to mint
   */

   function mintBond(address buyer, uint256 _bondsAmount) public onlyOwner {

     require(buyer != address(0));
     require(_bondsAmount >= 1);
     require(_bondsAmount <= loopLimit);

     if (cap > 0)
       require(bondsNumber.add(_bondsAmount) <= cap);

     bondsNumber = bondsNumber.add(_bondsAmount);

     nonce = nonce.add(_bondsAmount);

     for (uint256 i = 0; i < _bondsAmount; i++) {

       maturities[nonce.sub(i)] = now.add(term);
       bonds[nonce.sub(i)] = buyer;
       couponsRedeemed[nonce.sub(i)] = 0;
       bondsAmount[buyer] = bondsAmount[buyer].add(_bondsAmount);

     }

     totalDebt = totalDebt.add(parValue.mul(_bondsAmount))
                 .add((parValue.mul(couponRate)
                 .div(100)).mul(timesToRedeem.mul(_bondsAmount)));

     emit MintedBond(buyer, _bondsAmount);

   }

   /**
   * @notice Redeem coupons on your bonds
   * @param _bonds An array of bond ids corresponding to the bonds you want to redeem apon
   */

   function redeemCoupons(uint256[] _bonds) public {

     require(_bonds.length > 0);
     require(_bonds.length <= loopLimit);
     require(_bonds.length <= getBalance(msg.sender));

     uint256 issueDate = 0;
     uint256 lastThresholdRedeemed = 0;
     uint256 toRedeem = 0;

     for (uint256 i = 0; i < _bonds.length; i++) {

       if (bonds[_bonds[i]] != msg.sender
           || couponsRedeemed[_bonds[i]] == timesToRedeem) continue;

       issueDate = maturities[_bonds[i]].sub(term);

       lastThresholdRedeemed = issueDate.add(couponsRedeemed[_bonds[i]].mul(couponThreshold));

       if (lastThresholdRedeemed.add(couponThreshold) >= maturities[_bonds[i]] ||
           now < lastThresholdRedeemed.add(couponThreshold)) continue;

       toRedeem = (now.sub(lastThresholdRedeemed)).div(couponThreshold);

       if (toRedeem == 0) continue;

       couponsRedeemed[_bonds[i]] = couponsRedeemed[_bonds[i]].add(toRedeem);

       getMoney( toRedeem.mul(parValue.mul(couponRate).div( 10 ** (parDecimals.add(2)) ) ), msg.sender );

       if (couponsRedeemed[_bonds[i]] == timesToRedeem) {

         bonds[_bonds[i]] = address(0);
         maturities[_bonds[i]] = 0;
         bondsAmount[msg.sender]--;

         getMoney(parValue.div( (10 ** parDecimals) ), msg.sender );

       }

     }

     emit RedeemedCoupons(msg.sender, _bonds);

   }

   /**
   * @notice Transfer bonds to another address
   * @param receiver The receiver of the bonds
   * @param _bonds The ids of the bonds that you want to transfer
   */

   function transfer(address receiver, uint256[] _bonds) public {

     require(_bonds.length > 0);
     require(receiver != address(0));
     require(_bonds.length <= getBalance(msg.sender));

     for (uint256 i = 0; i < _bonds.length; i++) {

       if (bonds[_bonds[i]] != msg.sender
           || couponsRedeemed[_bonds[i]] == timesToRedeem) continue;

       bonds[_bonds[i]] = receiver;
       bondsAmount[msg.sender] = bondsAmount[msg.sender].sub(1);
       bondsAmount[receiver] = bondsAmount[receiver].add(1);

     }

     emit Transferred(msg.sender, receiver, _bonds);

   }

   /**
   * @notice Donate money to this contract
   */

   function donate() public payable {

     require(address(token) == address(0));

   }

   function() payable { revert(); }

   //PRIVATE

   /**
   * @notice Transfer coupon money to an address
   * @param amount The amount of money to be transferred
   * @param receiver The address which will receive the money
   */

   function getMoney(uint256 amount, address receiver) private {

     if (address(token) == address(0))
       receiver.transfer(amount);

     else
       token.transfer(msg.sender, amount);

     totalDebt = totalDebt.sub(amount);

   }

   //GETTERS

   /**
   * @dev Get the last time coupons for a particular bond were redeemed
   * @param bond The bond id to analyze
   */

   function getLastTimeRedeemed(uint256 bond) public view returns (uint256) {

     uint256 issueDate = maturities[bond].sub(term);

     uint256 lastThresholdRedeemed = issueDate.add(couponsRedeemed[bond].mul(couponThreshold));

     return lastThresholdRedeemed;

   }

   /**
   * @dev Get the owner of a specific bond
   * @param bond The bond id to analyze
   */

   function getBondOwner(uint256 bond) public view returns (address) {

     return bonds[bond];

   }

   /**
   * @dev Get how many coupons remain to be redeemed for a specific bond
   * @param bond The bond id to analyze
   */

   function getRemainingCoupons(uint256 bond) public view returns (int256) {

     address owner = getBondOwner(bond);

     if (owner == address(0)) return -1;

     uint256 redeemed = getCouponsRedeemed(bond);

     return int256(timesToRedeem - redeemed);

   }

   /**
   * @dev Get how many coupons were redeemed for a specific bond
   * @param bond The bond id to analyze
   */

   function getCouponsRedeemed(uint256 bond) public view returns (uint256) {

     return couponsRedeemed[bond];

   }

   /**
   * @dev Get the address of the token that is redeemed for coupons
   */

   function getTokenAddress() public view returns (address) {

     return (address(token));

   }

   /**
   * @dev Get how many times coupons can be redeemed for bonds
   */

   function getTimesToRedeem() public view returns (uint256) {

     return timesToRedeem;

   }

   /**
   * @dev Get how much time it takes for a bond to mature
   */

   function getTerm() public view returns (uint256) {

     return term;

   }

   /**
   * @dev Get the maturity date for a specific bond
   * @param bond The bond id to analyze
   */

   function getMaturity(uint256 bond) public view returns (uint256) {

     return maturities[bond];

   }

   /**
   * @dev Get how much money is redeemed on a coupon
   */

   function getSimpleInterest() public view returns (uint256) {

     uint256 rate = getCouponRate();

     uint256 par = getParValue();

     return par.mul(rate).div(100);

   }

   /**
   * @dev Get the yield of a bond
   */

   function getCouponRate() public view returns (uint256) {

     return couponRate;

   }

   /**
   * @dev Get the par value for these bonds
   */

   function getParValue() public view returns (uint256) {

     return parValue;

   }

   /**
   * @dev Get the cap amount for these bonds
   */

   function getCap() public view returns (uint256) {

     return cap;

   }

   /**
   * @dev Get amount of bonds that an address has
   * @param who The address to analyze
   */

   function getBalance(address who) public view returns (uint256) {

     return bondsAmount[who];

   }

   /**
   * @dev If the par value is a real number, it might have decimals. Get the amount of decimals the par value has
   */

   function getParDecimals() public view returns (uint256) {

     return parDecimals;

   }

   /**
   * @dev Get the address of the token redeemed for coupons
   */

   function getTokenToRedeem() public view returns (address) {

     return tokenToRedeem;

   }

   /**
   * @dev Get the name of this smart bond contract
   */

   function getName() public view returns (string) {

     return name;

   }

   /**
   * @dev Get the current unpaid debt
   */

   function getTotalDebt() public view returns (uint256) {

     return totalDebt;

   }

   /**
   * @dev Get the total amount of bonds issued
   */

   function getTotalBonds() public view returns (uint256) {

     return bondsNumber;

   }

   /**
   * @dev Get the latest nonce
   */

   function getNonce() public view returns (uint256) {

     return nonce;

   }

   /**
   * @dev Get the amount of time that needs to pass between the dates when you can redeem coupons
   */

   function getCouponThreshold() public view returns (uint256) {

     return couponThreshold;

   }

}