"use client";

import React from "react";

export default function ProjectPage({ params }) {
  const { id } = React.use(params);

  return <div>ProjectPage {id}</div>;
}
