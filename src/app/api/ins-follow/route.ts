export async function POST(ctx: Request): Promise<Response> {
  console.log(ctx);
  const body = await ctx.json();
  console.log(body);
  return new Response(JSON.stringify({ name: "czn" }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
