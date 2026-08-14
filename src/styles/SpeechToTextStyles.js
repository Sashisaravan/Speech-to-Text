const SpeechToTextStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    background: "#090912",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "850px",
    padding: "30px",
    borderRadius: "16px",
    background: "#12121c",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
  },

  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#9999aa",
    marginBottom: "25px",
  },

  textArea: {
    width: "100%",
    minHeight: "280px",
    padding: "18px",
    boxSizing: "border-box",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "#0d0d15",
    color: "#ffffff",
    fontSize: "16px",
    lineHeight: 1.6,
    outline: "none",
    resize: "vertical",
    fontFamily: "Inter, sans-serif",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "12px",
    color: "#9999aa",
    fontSize: "13px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  stats: {
    display: "flex",
    gap: "30px",
    marginTop: "20px",
    color: "#9999aa",
    fontSize: "13px",
  },

  statValue: {
    color: "#ffffff",
    fontWeight: 600,
  },
};

export default SpeechToTextStyles;