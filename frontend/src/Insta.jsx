import { useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import "./App.css";

function Insta() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!token.trim()) return alert("Enter your access token");

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:8000/instagram?token=${token}`);

      const posts = res?.data?.data?.data || [];
      setData(posts);

      const labels = posts.map((p, i) => p.caption?.slice(0, 25) || `Post ${i + 1}`);

      setChartData({
        labels,
        datasets: [
          {
            label: "Likes",
            data: posts.map((p) => p.like_count || 0),
          },
          {
            label: "Comments",
            data: posts.map((p) => p.comments_count || 0),
          },
        ],
      });
    } catch (err) {
      console.log(err);
      alert("Failed to fetch Instagram data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <h1 className="title">Instagram Analytics Dashboard</h1>
          <p className="subtitle">
            Fetch your posts + visualize Likes & Comments
          </p>
        </div>


        <div className="topBar">
          <input
            className="input"
            type="text"
            placeholder="Paste your Instagram Access Token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button className="btn" onClick={handle} disabled={loading}>
            {loading ? "Fetching..." : "Submit"}
          </button>
        </div>


        {chartData && (
          <div className="chartCard">
            <div className="chartHeader">
              <h2 className="chartTitle">Engagement Overview</h2>
              <p className="chartSubtitle">Likes vs Comments (Top {data.length} posts)</p>
            </div>

            <div className="chartWrap">
              <Bar data={chartData} />
            </div>
          </div>
        )}

        <div className="sectionHeader">
          <h2 className="sectionTitle">Posts</h2>
          <p className="sectionSubtitle">
            Showing {data.length} posts
          </p>
        </div>

        <div className="grid">
          {data?.map((post) => (
            <div key={post.id} className="card">
              <div className="mediaBox">
                {post.media_type === "VIDEO" ? (
                  <video className="media" controls src={post.media_url}></video>
                ) : (
                  <img className="media" src={post.media_url} alt="post" />
                )}
              </div>

              <div className="content">
                <p className="caption">{post.caption || "No caption"}</p>

                <div className="stats">
                  <span className="pill">❤️ {post.like_count || 0}</span>
                  <span className="pill">💬 {post.comments_count || 0}</span>
                </div>

                {post.permalink && (
                  <a
                    className="link"
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open on Instagram →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {!loading && data.length === 0 && (
          <p className="empty">No data yet. Enter token and click Submit</p>
        )}
      </div>
    </div>
  );
}

export default Insta;
