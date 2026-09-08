
import { useState } from "react";
import ScrambleText from "../components/ScrambleText";
import KineticWord from "../components/KineticWord";

export default function Clients() {
  const [accessCode, setAccessCode] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Secure gallery lookup will be connected later.
    console.log(accessCode);
  }

  return (
    <section className="bg-black">
      <div className="border-b-2 border-white px-4 py-10 sm:py-14">
        <p className="mono mb-5 text-[10px] text-white/50">
          <ScrambleText text="[ 04 ] PRIVATE ACCESS" trigger="mount" />
        </p>

        <h1 className="display text-[15vw] leading-[0.78] sm:text-[12vw] lg:text-[9vw]">
          <KineticWord text="CLIENT" className="block" />
          <KineticWord text="GALLERIES" className="block stroke" />
        </h1>
      </div>

      <div className="grid min-h-[55vh] grid-cols-1 border-b-2 border-white lg:grid-cols-2">
        <div className="flex items-center border-b-2 border-white px-4 py-12 sm:px-8 lg:border-b-0 lg:border-r-2">
          <form onSubmit={handleSubmit} className="w-full max-w-xl">
            <label
              htmlFor="access-code"
              className="mono mb-3 block text-[10px] text-white/60"
            >
              Gallery access code
            </label>

            <input
              id="access-code"
              type="text"
              required
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              placeholder="ENTER YOUR CODE"
              autoComplete="off"
              className="mono w-full border-2 border-white bg-black px-4 py-5 text-xs text-white placeholder-white/30 outline-none focus:bg-white focus:text-black"
            />

            <button
              type="submit"
              className="mono mt-4 border-2 border-white bg-white px-8 py-5 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white"
            >
              Access gallery →
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-between px-4 py-12 sm:px-8">
          <div>
            <p className="mono mb-4 text-[10px] text-white/40">
              PRIVATE DELIVERY
            </p>

            <p className="max-w-lg text-2xl leading-snug sm:text-3xl">
              Enter the access code included with your gallery delivery.
            </p>
          </div>

          <p className="mono mt-16 max-w-md text-[10px] leading-relaxed text-white/40">
            LOST YOUR CODE? CONTACT MAXX@MAXXSLATER.COM FOR ACCESS.
          </p>
        </div>
      </div>
    </section>
  );
}