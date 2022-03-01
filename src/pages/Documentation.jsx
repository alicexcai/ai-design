import React, { useRef } from "react";

import "../css/Documentation.css";

function Documentation() {
  const problemRef = useRef(null);
  const groupifyRef = useRef(null);
  const cognifyRef = useRef(null);
  const technifyRef = useRef(null);
  const creativityRef = useRef(null);

  const scrollBehavior = { behavior: "smooth", block: "start" };

  return (
    <div className="doc">
      <div className="doc-wrapper">
        <div className="doc-sidebar">
          <div className="doc-sidebar-wrapper">
            <span
              onClick={() => problemRef.current.scrollIntoView(scrollBehavior)}
            >
              Problem Statement
            </span>
            <span
              onClick={() => groupifyRef.current.scrollIntoView(scrollBehavior)}
            >
              Groupify
            </span>
            <span
              onClick={() => cognifyRef.current.scrollIntoView(scrollBehavior)}
            >
              Cognify
            </span>
            <span
              onClick={() => technifyRef.current.scrollIntoView(scrollBehavior)}
            >
              Technify
            </span>
            <span
              onClick={() =>
                creativityRef.current.scrollIntoView(scrollBehavior)
              }
            >
              Creativity
            </span>
          </div>
        </div>
        <div className="doc-main">
          <div className="doc-paragraph-container" ref={problemRef}>
            <h2>Problem Statement</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              libero nisi voluptates obcaecati expedita enim amet repellendus
              ratione cupiditate suscipit facilis, fugit rem sapiente commodi.
            </p>
          </div>
          <div className="doc-paragraph-container" ref={groupifyRef}>
            <h2>Groupify</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              libero nisi voluptates obcaecati expedita enim amet repellendus
              ratione cupiditate suscipit facilis, fugit rem sapiente commodi.
            </p>
          </div>
          <div className="doc-paragraph-container" ref={cognifyRef}>
            <h2>Cognify</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              libero nisi voluptates obcaecati expedita enim amet repellendus
              ratione cupiditate suscipit facilis, fugit rem sapiente commodi.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ea
              quo a soluta similique impedit voluptas deleniti unde, esse, in
              fuga iste! Repellat consequatur obcaecati animi tenetur ipsum
              doloremque, accusantium sequi, perspiciatis nihil amet voluptates,
              sapiente voluptatum nostrum esse omnis tempora deserunt nemo
              harum. Consequuntur ratione culpa nihil soluta rerum nostrum
              inventore quia cupiditate doloribus quam ipsum voluptatibus
              accusamus ullam dicta, quod voluptatem! Aliquid saepe modi, ea aut
              perferendis quidem excepturi, quasi cum ipsum corrupti
              voluptatibus voluptas? Rem, et odit. Atque deleniti eos, eveniet
              cumque ut ab voluptatum labore similique hic blanditiis magni
              quisquam assumenda asperiores animi ipsum sed modi!
            </p>
          </div>
          <div className="doc-paragraph-container" ref={technifyRef}>
            <h2>Technify</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              libero nisi voluptates obcaecati expedita enim amet repellendus
              ratione cupiditate suscipit facilis, fugit rem sapiente commodi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Recusandae beatae itaque voluptatem veniam amet ab saepe
              consectetur suscipit totam quidem molestias quo sed hic cupiditate
              id quis dolores minima commodi illum unde ipsam soluta ducimus,
              provident ad. Quod consectetur minus incidunt. Esse quos nisi
              tenetur minima libero iure eligendi vero voluptate quisquam
              officiis, deserunt fuga. Ullam consequatur porro distinctio
              praesentium sed, deleniti laborum veniam exercitationem id dicta
              voluptate eveniet tempora nihil! Magnam modi dolore ipsa odio
              voluptatibus error nam sequi illo nisi quisquam alias ad debitis,
              officia earum ea. Consequatur ex quae reiciendis maiores at iure.
              Est id illum error.
            </p>
          </div>
          <div className="doc-paragraph-container" ref={creativityRef}>
            <h2>Creativity</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              libero nisi voluptates obcaecati expedita enim amet repellendus
              ratione cupiditate suscipit facilis, fugit rem sapiente commodi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis,
              necessitatibus, ducimus voluptate voluptatibus debitis animi rem
              magni tempore repellat nulla quae a nisi? At doloremque, vel
              consectetur officiis eveniet ratione, explicabo amet dolorem
              itaque nisi similique nobis enim. Nostrum ipsum unde, dolor fugiat
              culpa optio, voluptas perferendis quos est molestias suscipit
              magnam tempora. Fugit laudantium animi sequi eaque nostrum ad
              placeat corporis distinctio magnam expedita? Exercitationem,
              tempore repellendus! Modi tenetur at debitis fugiat eligendi
              beatae est perspiciatis, repellendus labore qui quo molestias aut!
              Eum nobis, repudiandae soluta cum esse quisquam quibusdam laborum?
              Inventore ducimus voluptatem officia dolor. Soluta, repudiandae
              dolores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documentation;
