import { css } from "@emotion/core";
import Link from "next/link";
import React from "react";

function Index() {
  return (
    <div>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

export default Index;
