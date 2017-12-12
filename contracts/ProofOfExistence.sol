pragma solidity ^0.4.15;

contract ProofOfExistence {
  mapping (bytes32 => bool) private proofs;

  function storeProof(bytes32 proof) {
    proofs[proof] = true;
  }

  function notarize(string document) {
    var proof = proofFor(document);
    storeProof(proof);
  }

  function proofFor(string document) constant returns (bytes32) {
    return sha256(document);
  }

  function checkDocument(string document) constant returns (bool) {
    var proof = proofFor(document);
    return hasProof(proof);
  }

  function hasProof(bytes32 proof) constant returns(bool) {
    return proofs[proof];
  }
}
