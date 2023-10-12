<template>
    <div class="borad-inner-body">
        <div class="borad-inner-body-con" v-if="details">
            <div class="operator-detail-wrapper">
                <div class="search-sec operator-detail-sec">
                    <div class="tickets-modal-list-sec">
                        <div class="tickets-details-modal-list">
                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Operator Name</span>
                                    <h3>{{ details.name }}</h3>
                                </div>
                            </div>
                            <template v-if="details.website_details">
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Website URL</span>
                                        <a class="website-link" :href="details.website_details.website_url" target="_blank">
                                            <h3>{{ details.website_details.website_url }}</h3>
                                        </a>
                                    </div>
                                </div>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Website ID</span>
                                        <h3>{{ details.website_details.website_id }}</h3>
                                    </div>
                                </div>
                            </template>
                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Login ID</span>
                                    <h3>{{ details.userid }}</h3>
                                </div>
                            </div>
                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Status</span>
                                    <div class="operator-check-con">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault.'+details.id"
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
                                    <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setForm(2, details)">
                                        <div class="edit-icon"><img src="@/assets/images/edit-icon.svg" alt=""></div>
                                        <div class="thm-heading">
                                            <h2>Edit</h2>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setForm(3, details)">
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
                <div class="operator-detail-tab todo border border-warning">
                    <div class="operator-detail-sec">
                        <ul class="nav nav-pills " id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-chat-flow-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-chat-flow" type="button" role="tab"
                                    aria-controls="pills-chat-flow" aria-selected="true">Chat Flow</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-whiltelable-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-whiltelable" type="button" role="tab"
                                    aria-controls="pills-whiltelable" aria-selected="false">Whiltelable</button>
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
                                                    <h2> Operator Name</h2>
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
    <FormComponent></FormComponent>
</template>
<script>
    import FormComponent from './FormComponent.vue'
    import axios from "axios"
    export default {
        name: 'DetailComponent',
        components: {
            FormComponent
        },
        props: ['item_id'],
        data() {
            return {
                resource: 'operators',
                details: {}
            }
        },
        watch: {
            '$store.state.change': function () {
                this.details.name = this.$store.state.change.item.name
                this.details.website_details.website_url = this.$store.state.change.item.website_url
                this.details.website_details.website_id = this.$store.state.change.item.website_id
                this.details.userid = this.$store.state.change.item.userid
                this.details.is_active = (this.$store.state.change.item.is_active=='true')?1:0; 
            }
        },
        mounted() {
            this.getItemDetails();
        },
        methods: {
            setForm(type, item) {
                this.$store.commit('data_Edit', {
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
                        //  Update item in the list *TO-DO*
                        item.is_active = Boolean(!item.is_active);
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