// backend: createGroup.js
import { supabase } from "./utils/supabase.js";
import { ethers } from "ethers";
//import AccountFactoryAbi from "./abi/AccountFactory.json";

export async function createGroup(owners, threshold, salt, signer) {
//   const factory = new ethers.Contract(
//     FACTORY_ADDRESS,
//     AccountFactoryAbi,
//     signer
//   );

//   const tx = await factory.createAccount(owners, threshold, salt);
//   const receipt = await tx.wait();
//   const groupAddress = receipt.events.find(e => e.event === "AccountCreated").args.account;

  // save to Supabase
  const { error } = await supabase.from("Groups").insert({
    address: groupAddress,
    owners:_owners,
    threshold: _threshold,
  });

  if (error) throw error;
  return groupAddress;
}
