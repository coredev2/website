"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          <h1 style={{ fontSize: "24px", fontWeight: 700 }}>
            Something went wrong
          </h1>
          <button
            onClick={reset}
            style={{
              marginTop: "12px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "#135AD6",
              color: "#fff",
              border: "none",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
