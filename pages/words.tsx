import Layout from "@/components/layout";
import Image from "next/image";

function WordsPage() {
  return (
    <Layout>
      {/* When the theme is dark, hide this div */}
      <div data-hide-on-theme="dark">
        <Image alt="" src="thirteen.svg" width={400} height={400} />
      </div>

      {/* When the theme is light, hide this div */}
      <div data-hide-on-theme="light">
        <Image alt="" src="vercel.svg" width={400} height={400} />
      </div>
    </Layout>
  );
}

export default WordsPage;
