import Link from "next/link";
import React from "react";

import withAuth from "../lib/withAuth";

function Admin() {
  return (
    <div>
      <Link href="/">
        <a>Map</a>
      </Link>
    </div>
  );
}

export default withAuth(Admin);
