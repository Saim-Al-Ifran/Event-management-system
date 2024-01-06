import React from 'react';
import logo from '../../../assets/images/icon/logo.png';
const Sidebar = () => {
  return (
    <aside class="menu-sidebar d-none d-lg-block">
    <div class="logo">
        <a href="#">
            <img src={logo} alt="Cool Admin" />
        </a>
    </div>
    <div class="menu-sidebar__content js-scrollbar1">
        <nav class="navbar-sidebar">
            <ul class="list-unstyled navbar__list">
                <li class=" has-sub">
                    <a class="js-arrow" href="#">
                        <i class="fas fa-tachometer-alt"></i>Dashboard</a>

                </li>
            </ul>
        </nav>
    </div>
</aside>
  );
};

export default Sidebar;
