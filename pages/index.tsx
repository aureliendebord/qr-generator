import { useRef, useState } from "react";
import Head from "next/head";
import QRCode from "qrcode.react";

export default function Home() {
  const textInput = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState("");

  const generateQr = () => {
    if (textInput?.current?.value) setUrl(textInput.current.value);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr") as HTMLCanvasElement;
    const pngUrl = canvas
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Head>
        <title>Générateur de QR Code</title>
        <meta name="description" content="Générateur de QR Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-200 h-screen">
        <main>
          <div className=" container mx-auto flex flex-col justify-center items-center py-12 space-y-12">
            <h1 className="text-3xl">Générateur de QR Code</h1>
            <input
              type="text"
              ref={textInput}
              className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />

            {
              <input
                type="button"
                value="Générer le QR"
                onClick={generateQr}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              />
            }
            {!!url && (
              <>
                <p className="text-center">
                  QR code généré pour :<br />
                  <strong>{url}</strong>
                </p>

                <QRCode
                  id="qr"
                  value={url}
                  size={128}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                />

                <button
                  type="button"
                  onClick={downloadQRCode}
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Télécharger QR Code
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
