import React, {Component} from "react";
import Col from "antd/lib/grid/col";
import {inject} from "mobx-react";
import {Link, IndexLink} from "react-router";

@inject("routingStore")
export class Header extends Component<{},{}> {
    render() {
        return (
            <Col span={24}>
                <section className="widget col-xs-12" style={{padding:0}}>
                    <header className="widget__header widget__header_size_s widget__header_color_dark"
                            style={{backgroundColor:'#ffcf5e'}}>
                        Проекты / Демозалы / Демозал КРЭТ, модернизация
                    </header>
                    <div className="widget__body" style={{height:'80px',padding:'30px 0'}}>
                        <ul className="menu">
                            <li className="menu__item">
                                <IndexLink to="/" className="menu__link link" activeClassName="menu__link_state_active">
                                    <span className="menu__icon "><i className="icon-folder"/></span>
                                    <span className="menu__title">Задачи</span>
                                </IndexLink>
                            </li>

                            <li className="menu__item">
                                <Link to="/workers" className="menu__link link"
                                      activeClassName="menu__link_state_active">
                                    <span className="menu__icon"><i className="icon-two-users"/></span>
                                    <span className="menu__title">Участники</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="options">
                            <li className="options__item">
                                <a className="options__link link">
                                                    <span className="options__icon"><i
                                                        className="icon-berezka"/> </span>
                                </a>
                            </li>
                            <li className="options__item">
                                <a className="options__link link">
                                    <span className="options__icon"><i className="icon-grid"/></span>
                                </a>
                            </li>
                            <li className="options__item">
                                <a className="options__link link">
                                    <span className="options__icon"><i className="icon-cols"/> </span>
                                </a>
                            </li>
                            <li className="options__item">
                                <a className="options__link link options__link_state_active">
                                    <span className="options__icon"><i className="icon-list"/> </span>
                                </a>
                            </li>
                            <li className="options__item">
                    <span className="options__icon">
                    <a className="options__item_squared options__link link">
                        А
                    </a>
                    </span>
                            </li>
                            <li className="options__item">
                    <span className="options__icon">
                    <a className="options__item_squared options__link link options__item_squared_state_active">
                        М
                    </a>
                    </span>
                            </li>
                        </ul>
                    </div>
                </section>
            </Col>
        )
    }
}