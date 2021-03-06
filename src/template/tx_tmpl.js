/** 
 * Template File for Tx data
 */
import React from "react"

//import Img from "gatsby-image"
//import "../styles/post.css"
import Layout from "../components/layout";

export default function TxPage({ pageContext }) {
    const { name, productNo, image } = pageContext.tx_data;

    return (
        <Layout>
            <div className="">
                <h1>{productNo}</h1>
                <p className="">{name}</p>
            </div>
            <img src={image.localFile.publicURL} alt={productNo}></img>
      {/* <div dangerouslySetInnerHTML={{ __html: body }} className="post-body" /> */}
        </Layout>
    )
}
