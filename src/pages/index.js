import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
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
      <h1>Textile List</h1>

      {/* 取得したデータを表示する。 */}
      {data.allContentfulTx.nodes.map(({ productNo, name }) => (
        <a href={`tx/${productNo}`}>
          <h3 key={productNo}>{productNo} : {name}</h3>
        </a>
      ))}
    </Layout>
  );
}

export default IndexPage
