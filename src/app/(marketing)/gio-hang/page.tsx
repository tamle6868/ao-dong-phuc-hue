import { redirect } from "next/navigation";

// Cart / online checkout is not yet a product surface — every order goes through
// the lead form so the team can confirm fabric / print / sizing on a real call.
// Send any stray hits to /lien-he where the lead form lives.
export default function CartRedirect() {
  redirect("/lien-he");
}
