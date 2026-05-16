import VideoPlayer from "../assets/VideoPlayer";
import { useState } from "react";

function Tutorial() {
  const [videoSelect, setVideoSelect] = useState("PC-instagram");
  const [videType, setVideoType] = useState("pc");
  return (
    <>
      <div className="line bg-[rgb(100,30,80)] w-90vh h-5 mx-auto"></div>

      <section className="mt-30" id="tutorial">
        <div className="bg-[rgb(40,80,140)] w-50 h-3 mx-auto rounded-xl mt-20"></div>
        <h1 className="text-5xl text-white mx-auto text-center mt-3">
          Tutorial
        </h1>

        <div
          className="
          mt-15 w-7/8 mx-auto
    bg-[rgb(20,35,55)]
    rounded-xl
    p-6
    shadow-[0_0_20px_rgba(60,30,100,0.4),0_0_60px_rgba(13,23,35,0.8)]
    border border-[rgba(255,255,255,0.05)]
  "
        >
          <div className="text-white">
            <p>
              <span className="font-bold text-[rgb(200,60,130)]">
                What needs to be wrapped?
              </span>{" "}
              Instagram and Messenger send and receive a huge amount of data in
              the background — account tokens, messages, media, and session
              info. Wrapping intercepts this traffic at the app level, giving
              you full control over what goes in and out.
            </p>
            <p>
              <span className="font-bold text-[rgb(40,80,140)]">
                Why do we need it?
              </span>{" "}
              Without wrapping, Instagram and Messenger operate as black boxes.
              They collect behavioral data, track your activity across apps, and
              share it with advertisers — all without your knowledge. Wrapping
              puts you back in control, blocking unauthorized data collection
              while keeping everything else working exactly as you'd expect.
            </p>
            <p>
              <span className="font-bold text-[rgb(200,60,130)]">
                {" "}
                Why is it safe?
              </span>{" "}
              Your data never leaves your device unencrypted. The wrapper acts
              as a local proxy — nothing is stored on external servers, no third
              party ever sees your credentials, and your account activity stays
              completely private. It's the same principle banks use to secure
              their apps.
            </p>
            <p>
              <span className="font-bold text-[rgb(40,80,140)] ">
                How can You make Instagram/Messenger Wrapped?
              </span>{" "}
              Below are video tutorials for both , PC and Mobile , that will
              help you export your information . Follow steps carefully and then
              drag the file in the input below.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-100 mt-7">
          {/* PC Section */}
          <div className="pc text-white flex items-center text-xl">
            <i className="fa-solid fa-computer"></i>

            {/* Instagram Button */}
            <button
              onClick={() => {
                setVideoSelect("PC-instagram");
                setVideoType("pc");
              }}
              className="ml-3 px-4 py-1.5 rounded-lg
        bg-linear-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]
        bg-clip-text text-transparent
        border-2 border-[#ee2a7b]
        hover:bg-none hover:[background:linear-gradient(to_right,#f9ce34,#ee2a7b,#6228d7)]
        hover:text-white hover:[background-clip:unset] hover:[-webkit-background-clip:unset]
        transition-all duration-200 ease-in-out"
            >
              Instagram
            </button>

            {/* Facebook Button */}
            <button
              onClick={() => {
                setVideoSelect("PC-facebook");
                setVideoType("pc");
              }}
              className="ml-5 px-4 py-1.5 rounded-lg
        text-[#1877F2]
        border-2 border-[#1877F2]
        hover:bg-[#1877F2] hover:text-white hover:scale-105
        transition-all duration-200 ease-in-out"
            >
              Facebook
            </button>
          </div>

          {/* Mobile Section */}
          <div className="mobile text-white flex items-center text-xl">
            <i className="fa-solid fa-mobile"></i>

            {/* Instagram Button */}
            <button
              onClick={() => {
                setVideoSelect("Pho-instagram");
                setVideoType("phone");
              }}
              className="ml-3 px-4 py-1.5 rounded-lg
        bg-linear-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]
        bg-clip-text text-transparent
        border-2 border-[#ee2a7b]
        hover:bg-none hover:[background:linear-gradient(to_right,#f9ce34,#ee2a7b,#6228d7)]
        hover:text-white hover:[background-clip:unset] hover:[-webkit-background-clip:unset]
        transition-all duration-200 ease-in-out"
            >
              Instagram
            </button>

            {/* Facebook Button */}
            <button
              onClick={() => {
                setVideoSelect("Pho-facebook");
                setVideoType("phone");
              }}
              className="ml-5 px-4 py-1.5 rounded-lg
        text-[#1877F2]
        border-2 border-[#1877F2]
        hover:bg-[#1877F2] hover:text-white hover:scale-105
        transition-all duration-200 ease-in-out"
            >
              Facebook
            </button>
          </div>
        </div>

        <div className="mt-15 w-5/8 mx-auto">
          {videoSelect == "PC-facebook" && (
            <VideoPlayer src="/pc-facebook.mp4" type={"pc"} />
          )}
          {videoSelect == "PC-instagram" && (
            <VideoPlayer src="/pc-instagram.mp4" type={"pc"} />
          )}
          {videoSelect == "Pho-facebook" && (
            <VideoPlayer src="/Mobile-facebook.mp4" type={"phone"} />
          )}
          {videoSelect == "Pho-instagram" && (
            <VideoPlayer src="/Mobile-instagram.mp4" type={"phone"} />
          )}

          <h1 className="text-white mx-auto text-center mt-5">
            <span className="text-red-800 font-bold">Important</span> : Select
            format type JSON. Otherwise it will not work
          </h1>
        </div>
      </section>
    </>
  );
}
export default Tutorial;
