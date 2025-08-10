import Head from "next/head"

const HeadDocument = ({ title = "lehna" }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default HeadDocument
