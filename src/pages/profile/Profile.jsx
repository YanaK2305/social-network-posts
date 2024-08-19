import st from "./Profile.module.scss";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleUser } from "../../redux/slices/userReducer";
import { getAllPostsByUserId } from "../../redux/slices/postsReducer";
import Post from "../../components/Post/Post";

export default function Profile() {
  const { id } = useParams();
  const { user: profileUser } = useSelector((state) => state.user);
  const { userPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState({});
  console.log(profileUser?.id);
  useEffect(() => {
    dispatch(getSingleUser(id)).then((data) => {
      setPostUser(data.payload);
    });
    dispatch(getAllPostsByUserId(id ? id : profileUser?.id));
  }, [id, profileUser]);
  const user = id ? postUser : profileUser;
  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        <div className={st.profileheader}>
          <div className={st.ava}>
            <img src={user?.image} alt="" />
          </div>
          <div className={st.wrappertop}>
            <div className={st.top}>
              <div className={st.aboutleft}>
                <h1 className={st.name}>
                  {user?.firstName} {user?.lastName}
                </h1>
                <h2 className={st.job}>
                  {user?.company?.department}, {user?.company?.name}
                </h2>
                <h2 className={st.address}>
                  {user?.company?.address?.state},{" "}
                  {user?.company?.address?.city}
                </h2>
              </div>
              <div className={st.aboutright}>
                <div className={st.education}>
                  <h3>Education</h3>
                  <h4>{user?.university}</h4>
                </div>
              </div>
            </div>
            <div className={st.btn}>
              <button>Connect</button>

              <button>Send an email</button>

              <button>Follow/Unfollow</button>
            </div>
          </div>

          {/* <div className={st.main}>
          <button>Background</button>
          <button>Recommendation</button>
          <button>Connections</button>
          <button>Following</button>
          <button>Followers</button>
        </div> */}
        </div>
        <div className={st.posts}>
          {userPosts.map((item) => (
            <Post item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
