import "./detail.css";

const Detail = () => {
  return (
    <div className="detail">
      {/* User */}
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      {/* Info */}
      <div className="info">
        {/* Option */}
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>

          {/* Photo */}

          <div className="photos">
            {/* PhotoItems */}
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./gojo.jpg" alt="" />
                <span>photo_2024_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./gojo.jpg" alt="" />
                <span>photo_2024_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./gojo.jpg" alt="" />
                <span>photo_2024_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./gojo.jpg" alt="" />
                <span>photo_2024_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./gojo.jpg" alt="" />
                <span>photo_2024_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            {/* PhotoItem end */}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
};

export default Detail;
