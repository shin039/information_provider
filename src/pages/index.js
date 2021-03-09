import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image  from "../components/image"
import SEO    from "../components/seo"

const IndexPage = () => {
  
  // Graphqlによる外部コンテンツの取得
  const data = useStaticQuery(graphql`
    query allContentfulinformation_source {
      allContentfulTx {
        nodes {
          productNo
          name
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>

      {/* 取得したデータを表示する。 */}
      {data.allContentfulTx.nodes.map(({ productNo, name }) => (
        <h3 key={productNo}>{productNo} : {name}</h3>
      ))}

      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
  );
}

export default IndexPage
