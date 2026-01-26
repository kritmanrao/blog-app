import { Form, useNavigation, redirect, useNavigate } from "react-router-dom";
import { addPost } from "../service/post";

export default function NewPost() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-5 rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
      >
        ← Go back
      </button>

      <div className="flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-6">
        <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-10 shadow-xl backdrop-blur-xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-green-400">
            Ready to post? Let's go!
          </h2>

          <Form method="post" className="space-y-5">
            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-1 font-medium text-white">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                placeholder="Enter post title"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <label htmlFor="content" className="mb-1 font-medium text-white">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={5}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                placeholder="Write your post here..."
              ></textarea>
            </div>

            {/* Visibility */}
            <div className="flex flex-col">
              <label
                htmlFor="visibility"
                className="mb-1 font-medium text-white"
              >
                Post Visibility
              </label>
              <select
                id="visibility"
                name="isPublished"
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-green-400 focus:outline-none"
              >
                <option className="bg-black" value="false">
                  Only Me 🔒
                </option>
                <option className="bg-black" value="true">
                  Public 🌍
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400 disabled:opacity-50"
            >
              {isSubmitting ? "Uploading..." : "Publish"}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.isPublished = data.isPublished === "true";
  await addPost(data); // send post to backend
  return redirect("/");
}
