const SideBar = () => {

    return (
        <aside className="menu">

            <div className="tabs">
                <ul>
                    <li className="is-active"><a>Pictures</a></li>
                    <li><a>Music</a></li>
                    <li><a>Videos</a></li>
                    <li><a>Documents</a></li>
                </ul>
            </div>

            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li><a href="#test" >Dashboard</a></li>
                <li><a href="#test" >Customers</a></li>
            </ul>
            <p className="menu-label">Треки &gt;</p>
            <ul className="menu-list">
                <li><a href="#test" >AAA</a></li>
                <li><a href="#test" >BBB</a></li>
                <li><a href="#test" >CCC</a></li>
            </ul>
            <p className="menu-label">
                Administration
  </p>
            <ul className="menu-list">
                <li><a href="#test" >Team Settings</a></li>
                <li>
                    <a href="#test" className="is-active">Manage Your Team</a>
                    <ul>
                        <li><a href="#test" >Members</a></li>
                        <li><a href="#test" >Plugins</a></li>
                        <li><a href="#test" >Add a member</a></li>
                    </ul>
                </li>
                <li><a href="#test" >Invitations</a></li>
                <li><a href="#test" >Cloud Storage Environment Settings</a></li>
                <li><a href="#test" >Authentication</a></li>
            </ul>

        </aside>
    );
}


export default SideBar;