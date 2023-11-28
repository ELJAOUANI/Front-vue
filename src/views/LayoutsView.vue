<script setup lang="ts"></script>
<template>
  <div class="page">
    <header class="app-header">
      <div class="main-header-container container-fluid">
        <div class="header-content-left">
          <div class="header-element">
            <div class="horizontal-logo">
              <a href="index.html" class="header-logo">
                <img src="@/assets/images/logo_1.png" alt="logo" class="desktop-logo" />
                <img src="@/assets/images/logo_1.png" alt="logo" class="toggle-logo" />
                <img src="@/assets/images/logo_1.png" alt="logo" class="desktop-dark" />
                <img src="@/assets/images/logo_1.png" alt="logo" class="toggle-dark" />
                <img src="@/assets/images/logo_1.png" alt="logo" class="desktop-white" />
                <img src="@/assets/images/logo_1.png" alt="logo" class="toggle-white" />
              </a>
            </div>
          </div>

          <div class="header-element">
            <a
              aria-label="Hide Sidebar"
              class="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
              data-bs-toggle="sidebar"
              href="javascript:void(0);"
              ><span></span
            ></a>
          </div>
        </div>

        <div class="header-content-right">
          <div class="header-element main-profile-user">
            <!-- Start::header-link|dropdown-toggle -->
            <a
              href="#"
              class="header-link dropdown-toggle"
              id="mainHeaderProfile"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <div class="d-flex align-items-center">
                <div class="me-xxl-2 me-0">
                  <img
                    src="../assets/images/faces/9.jpg"
                    alt="img"
                    width="32"
                    height="32"
                    class="rounded-circle"
                  />
                </div>
                <div class="d-xxl-block d-none my-auto">
                  <h6 class="fw-semibold mb-0 lh-1 fs-14">Json Taylor</h6>
                  <span class="op-7 fw-normal d-block fs-11 text-dark">Web Designer</span>
                </div>
              </div>
            </a>
            <ul
              class="main-header-dropdown dropdown-menu pt-0 header-profile-dropdown dropdown-menu-end"
              aria-labelledby="mainHeaderProfile"
            >
              <li class="drop-heading d-xxl-none d-block">
                <div class="text-center">
                  <h5 class="text-dark mb-0 fs-14 fw-semibold">Json Taylor</h5>
                  <small class="text-dark">Web Designer</small>
                </div>
              </li>
              <li class="dropdown-item">
                <a class="d-flex w-100" href="profile.html"
                  ><i class="fe fe-user fs-18 me-2 text-primary"></i>Profile</a
                >
              </li>
              <li class="dropdown-item">
                <a class="d-flex w-100" href="mail.html"
                  ><i class="fe fe-mail fs-18 me-2 text-primary"></i>Inbox
                  <span class="badge bg-danger ms-auto">25</span></a
                >
              </li>
              <li class="dropdown-item">
                <a class="d-flex w-100" href="mail-settings.html"
                  ><i class="fe fe-settings fs-18 me-2 text-primary"></i>Settings</a
                >
              </li>
              <li class="dropdown-item">
                <a class="d-flex w-100" href="chat.html"
                  ><i class="fe fe-headphones fs-18 me-2 text-primary"></i>Support</a
                >
              </li>
              <li class="dropdown-item">
                <a class="d-flex w-100" href="lockscreen.html"
                  ><i class="fe fe-lock fs-18 me-2 text-primary"></i>Lockscreen</a
                >
              </li>
              <li class="dropdown-item">
                <a class="d-flex w-100" href="sign-in.html"
                  ><i class="fe fe-info fs-18 me-2 text-primary"></i>Log Out</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <aside class="app-sidebar sticky" id="sidebar">
      <!-- Start::main-sidebar-header -->
      <div class="main-sidebar-header">
        <a href="index.html" class="header-logo">
          <img src="@/assets/images/logo_1.png" width="100" alt="logo" class="desktop-logo" />
          <img src="../assets/images/brand-logos/toggle-logo.png" alt="logo" class="toggle-logo" />
          <img
            src="../assets/images/brand-logos/desktop-dark.png"
            alt="logo"
            class="desktop-dark"
          />
          <img src="../assets/images/brand-logos/toggle-dark.png" alt="logo" class="toggle-dark" />
          <img
            src="../assets/images/brand-logos/desktop-white.png"
            alt="logo"
            class="desktop-white"
          />
          <img
            src="../assets/images/brand-logos/toggle-white.png"
            alt="logo"
            class="toggle-white"
          />
        </a>
      </div>

      <div class="main-sidebar" id="sidebar-scroll">
        <!-- Start::nav -->
        <nav class="main-menu-container nav nav-pills flex-column sub-open">
          <div class="slide-left" id="slide-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#7b8191"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
              ></path>
            </svg>
          </div>
          <ul class="main-menu">
            <li class="slide__category mb-4"><span class="category-name">Main</span></li>
            <li class="slide active-side">
              <a href="index.html" class="side-menu__item">
                <i class="ti ti-smart-home side-menu__icon"></i>
                <span class="side-menu__label">Dashboard</span>
              </a>
            </li>
            <li class="slide">
              <a href="index.html" class="side-menu__item">
                <i class="ti ti-users side-menu__icon"></i>
                <span class="side-menu__label">Techniciens</span>
              </a>
            </li>
            <li class="slide">
              <a href="index.html" class="side-menu__item">
                <i class="ti ti-box side-menu__icon"></i>
                <span class="side-menu__label">Articles</span>
              </a>
            </li>

            <li class="slide">
              <a href="index.html" class="side-menu__item">
                <i class="ti ti-bookmarks side-menu__icon"></i>
                <span class="side-menu__label">Rapports</span>
              </a>
            </li>

            <li class="slide">
              <a href="index.html" class="side-menu__item">
                <i class="ti ti-file-dollar side-menu__icon"></i>
                <span class="side-menu__label">Factures</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <div class="main-content app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
#sidebar {
  background-color: #262626;
}

#sidebar .main-sidebar-header {
  background-color: #262626;
  border-block-end: none;
}

.main-menu .slide a i,
span {
  color: white !important;
}

.main-menu .side-menu__item:hover {
  color: #01adef !important;
}



</style>
