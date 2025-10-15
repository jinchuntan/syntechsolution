
export async function POST(req: Request) {
  const { name, email, org, message } = await req.json();
  console.log("CONTACT:", { name, email, org, message });
  return Response.json({ ok: true });
}
