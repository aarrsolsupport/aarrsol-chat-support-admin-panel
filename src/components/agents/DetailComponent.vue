<template>
    <div class="borad-inner-body-sec">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con" v-if="details">
                <div class="operator-detail-wrapper">
                    <div class="search-sec operator-detail-sec">
                        <div class="tickets-modal-list-sec">
                            <div class="tickets-details-modal-list">
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Agent Name</span>
                                        <h3>{{ details.name }}</h3>
                                    </div>
                                </div>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Login ID</span>
                                        <h3>{{ details.userid }}</h3>
                                    </div>
                                </div>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Categories</span>
                                        <div class="Categories-btn tickets-details-item">
                                            <button v-for="(cat, index) in details.categories" class="thm-btn grey-bg" :key="index">{{ cat.description }}</button>
                                            <!-- <button class="thm-btn more-btn ">2 More</button>   -->
                                        </div>
                                    </div>
                                </div>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Status</span>
                                        <div class="operator-check-con">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox"
                                                    :id="'flexSwitchCheckDefault.' + details.id"
                                                    :checked="details.is_active ?? null" @click="toggleStatus(details)">
                                                <label for="flexSwitchCheckDefault">Active</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="operator-detail-item">
                            <div class="more-action-sec">
                                <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                        src="@/assets/images/more-operator-detail.svg" alt=""></button>
                                <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                    <li>
                                        <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas"
                                            data-bs-target="#agentoffcanvas" aria-controls="agentoffcanvas"
                                            @click="setAgForm(2, details)">
                                            <div class="edit-icon"><img src="@/assets/images/edit-icon.svg" alt=""></div>
                                            <div class="thm-heading">
                                                <h2>Edit</h2>
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas"
                                            data-bs-target="#agentoffcanvas" aria-controls="agentoffcanvas"
                                            @click="setAgForm(3, details)">
                                            <div class="edit-icon"><img src="@/assets/images/update-password.svg" alt=""></div>
                                            <div class="thm-heading">
                                                <h2>Update Password</h2>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="operator-detail-tab">
                        <div class="operator-detail-sec">
                            <ul class="nav nav-pills " id="pills-tab" role="tablist">
                                <li class="nav-item todo border border-warning" role="presentation">
                                    <button class="nav-link active" id="pills-user-chat-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-user-chat-flow" type="button" role="tab"
                                        aria-controls="pills-user-chat-flow" aria-selected="true">Chat With User</button>
                                </li>
                                <li class="nav-item todo border border-warning" role="presentation">
                                    <button class="nav-link" id="pills-tickets-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-tickets" type="button" role="tab" aria-controls="pills-tickets"
                                        aria-selected="false">Tickets</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="operator-table-sec todo border border-warning">
                    <div class="operator-detail-tab-con">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-chat-flow" role="tabpanel"
                                aria-labelledby="pills-chat-flow-tab">
                                <div class="operator-tab-item-one">
                                    <div class="thm-heading">
                                        <h2>Chatbot Flow </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-whiltelable" role="tabpanel"
                                aria-labelledby="pills-whiltelable-tab">
                                <div class="operator-tab-item-two">
                                    <div class="operator-table-con">
                                        <table class="table thm-heading">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <h2> S.No</h2>
                                                    </th>
                                                    <th>
                                                        <h2> Shitelable Name</h2>
                                                    </th>
                                                    <th>
                                                        <h2> Website URL</h2>
                                                    </th>
                                                    <th>
                                                        <h2> Website Id</h2>
                                                    </th>
                                                    <th>
                                                        <h2> Login Id</h2>
                                                    </th>
                                                    <th>
                                                        <h2> Status</h2>
                                                    </th>
                                                    <th>
                                                        <h2> Action</h2>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <h2> 1</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 2</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 3</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 4</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 5</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 6</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 7</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 8</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h2> 9</h2>
                                                    </th>

                                                    <td class="website-link"><a href="operator-detail.html">
                                                            <h2>Arjun124</h2>
                                                        </a></td>
                                                    <td class="website-link"><a href="#">
                                                            <h2>Clickbet.com</h2>
                                                        </a></td>
                                                    <td>
                                                        <h2> Clickbet1254</h2>
                                                    </td>
                                                    <td>
                                                        <h2> Abcd#123</h2>
                                                    </td>
                                                    <td>
                                                        <div class="operator-check-con">
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckDefault">
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="more-action-sec">
                                                            <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                    src="@/assets/images/more-action.svg" alt=""></button>
                                                            <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/edit-icon.svg" alt="">
                                                                        </div>
                                                                        <div class="thm-heading">
                                                                            <h2>Edit</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button class="dropdown-item more-list-btn" type="button">
                                                                        <div class="edit-icon"><img
                                                                                src="@/assets/images/update-password.svg"
                                                                                alt=""></div>
                                                                        <div class="thm-heading">
                                                                            <h2>Update Password</h2>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="operator-table-footer">
                                        <div class="entries-sec">
                                            <div class="thm-heading">
                                                <h2>Show</h2>
                                            </div>
                                            <div class="entries-select">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected="">01</option>
                                                    <option value="1">02</option>
                                                    <option value="2">03</option>
                                                    <option value="3">04</option>
                                                </select>
                                            </div>
                                            <div class="thm-heading">
                                                <h2>entries</h2>
                                            </div>
                                        </div>
                                        <div class="entries-pages">
                                            <div class="thm-heading">
                                                <h2>Showing 1 to 10 of 12 entries</h2>
                                            </div>
                                            <div class="entries-pagination">
                                                <nav aria-label="Page navigation example">
                                                    <ul class="pagination">
                                                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                        <li class="page-item"><a class="page-link active" href="#">1</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AgFormComponent></AgFormComponent>
    </div>
</template>
<script>
import AgFormComponent from './FormComponent.vue'
import axios from "axios"
export default {
    name: 'DetailComponent',
    components: {
        AgFormComponent
    },
    props: ['item_id'],
    data() {
        return {
            resource: 'agents',
            details: {}
        }
    },
    watch: {
        '$store.state.agent_change': function () {
            this.details.name = this.$store.state.agent_change.item.name
            this.details.userid = this.$store.state.agent_change.item.userid
            this.details.is_active = (this.$store.state.agent_change.item.is_active == 1) ? 1 : 0;
            this.details.categories = Object.assign({}, this.$store.state.agent_change.item.categories)
        }
    },
    mounted() {
        this.getItemDetails();
    },
    methods: {
        setAgForm(type, item) {
            this.$store.commit('ag_data_Edit', {
                'form_type': type,
                'form_item': item
            })
        },
        getItemDetails() {
            this.$store.commit('is_loader', true);
            axios.post('/' + this.resource + '/get-details', { 'id': this.item_id }).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    this.details = res.data.data.details;
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        toggleStatus(item) {
            this.$store.commit('is_loader', true);
            axios.post('/' + this.resource + '/toggle-status', { "id": item.id }).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    this.$toast.success(res.data.message);
                    item.is_active = (item.is_active == 1) ? 0 : 1;
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        }
    }
}
</script>