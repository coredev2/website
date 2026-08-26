import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
          background: "#082C7F",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "14px", opacity: 0.7 }}>404</p>
          <h1 style={{ fontSize: "24px", fontWeight: 700 }}>
            Page not found
          </h1>
          <Link href="/en" style={{ color: "#38bdf8" }}>
            Back to LinkYou
          </Link>
        </div>
      </body>
    </html>
  );
}
