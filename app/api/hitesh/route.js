import HiteshService from "@/app/services/hitesh.service.js";

const hiteshService = new HiteshService();

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Validate input
    if (!message?.trim()) {
      return Response.json({
        status: 400,
        message: "Message is required",
        data: null,
      });
    }

    const data = await hiteshService.getResponse(message.trim());

    return Response.json({
      status: 200,
      message: "Success",
      data,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
