import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import st from "./Home.module.scss";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../redux/slices/postsReducer";
import Posts from "../../components/Posts/Posts";
import { Link } from "react-router-dom";
import photo from "../../assets/Photo.svg";
import video from "../../assets/video.svg";
import event from "../../assets/event.svg";
import write from "../../assets/write.svg";
import Popup from "../../components/Popup/Popup";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { page, sort, search } = useSelector((state) => state.posts);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [page, sort, search]);
  function toggleSearch() {
    setSearchOpen((prev) => !prev);
  }
  return (
    <div className={st.root}>
      <Header toggleSearch={toggleSearch} />
      <div className="container">
        {searchOpen && <Search />}
        <div className={st.mainhome}>
          <div className={st.rightpage}>
            <div className={st.toppage}>
              <Link to="/profile">
                <img className={st.profile} src={user?.image} alt="" />
              </Link>
              <div className={st.referense}>
                <button>
                  <img src={photo} alt="" />
                  <span>Photo</span>
                </button>
                <button>
                  <img src={video} alt="" />
                  <span>Video</span>
                </button>
                <button>
                  <img src={event} alt="" />
                  <span>Event</span>
                </button>
                <button onClick={() => setOpen(true)}>
                  <img src={write} alt="" />
                  <span>Write an Article</span>
                </button>
              </div>
            </div>
            <Posts />
          </div>
          <div className={st.leftpage}>
            <Filter />
            <div className={st.lefttop}>
              <div className={st.toptop}>
                <h3>People viewed your profile in the past 7 days</h3>
                <h3>Connections grow your network </h3>
              </div>
              <div className={st.position}>
                <h3>members with a position get 3 times more profile views</h3>
                <button>Add your Position</button>
              </div>
            </div>
            <div className={st.leftmain}>
              <h2>People you might know</h2>
              <div></div>
              <button className={st.btn}>View all recommendations</button>
            </div>
          </div>
        </div>
      </div>
      {open && <Popup onClose={() => setOpen(false)} />}
      {/* Когда Open true мы открываем попап */}
    </div>
  );
}
