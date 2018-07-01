import React, {Component} from 'react'
import {Link} from 'react-router'
import {changeLang} from '../../_shared/functions'
import './header.css'

const avatar = '/tuncay.jpg';
const logo = '/digilogo.jpg';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            specialMenu: [
                {
                    text: 'Kişisel Bilgilerim',
                    icon: 'assignment_ind',
                    notificationCount: 0
                },
                {
                    text: 'Maaş Bilgilerim',
                    icon: 'attach_money',
                    notificationCount: 0
                },
                {
                    text: 'Hizmet Bilgilerim',
                    icon: 'recent_actors',
                    notificationCount: 0
                },
                {
                    text: 'İzin Bilgilerim',
                    icon: 'alarm',
                    notificationCount: 0
                },
                {
                    text: 'Eğitim Bilgilerim',
                    icon: 'book',
                    notificationCount: 0
                },
                {
                    text: 'Ödül ve Cezalar',
                    icon: 'thumbs_up_down',
                    notificationCount: 0
                },
                {
                    text: 'Araç Talep',
                    icon: 'directions_car',
                    notificationCount: 0
                },
                {
                    text: 'Bilgi İşlem Talep',
                    icon: 'settings_input_composite',
                    notificationCount: 0
                },
                {
                    text: 'İş Talep',
                    icon: 'add_to_queue',
                    notificationCount: 0
                }
            ],
            instituteMenu: [
                {
                    text: 'İlanlar',
                    icon: 'record_voice_over',
                    notificationCount: 0
                },
                {
                    text: 'Güncel',
                    icon: 'query_builder',
                    notificationCount: 0
                },
                {
                    text: 'Eğitim',
                    icon: 'book',
                    notificationCount: 0
                },
                {
                    text: 'İndirimli Kurumlar',
                    icon: 'trending_down',
                    notificationCount: 0
                },
                {
                    text: 'Yayınlar',
                    icon: 'speaker_notes',
                    notificationCount: 0
                },
                {
                    text: 'Özel Kutlamalar',
                    icon: 'stars',
                    notificationCount: 0
                },
                {
                    text: 'Görev Değişiklikleri',
                    icon: 'cached',
                    notificationCount: 0
                },
                {
                    text: 'Telefon Rehberi',
                    icon: 'contact_phone',
                    notificationCount: 0
                },
                {
                    text: 'Başkandan Mesaj',
                    icon: 'mic_none',
                    notificationCount: 0
                }
            ],
            favoriteWebPages: [
                {
                    text: 'google.com',
                    icon: 'link',
                    notificationCount: 0
                },
                {
                    text: 'yahoo.com',
                    icon: 'link',
                    notificationCount: 0
                },
                {
                    text: 'facebook.com',
                    icon: 'link',
                    notificationCount: 0
                },
                {
                    text: 'twitter.com',
                    icon: 'link',
                    notificationCount: 0
                }
            ],
            smallLocation: ['municipality-management-system'],
            location: this.props.location
        }
    }

    render() {
        return (
            <div className={`digi-header animated slideInLeft`} id="navbar">
                <div className="logo">
                    <Link to={`/`}>
                        <img src={logo} alt=""/>
                    </Link>
                </div>
                <div className="logo-title">
                    DIGISMART
                    <span>
                        Belediye Yönetim Sistemi
                    </span>
                </div>
                <ul className="nav nav-menu navbar-right">
                    <li className="">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            <i className="material-icons">settings</i>
                            <span className="visible-md visible-lg">
                                ayarlar <span>Sistem ayarları</span>
                            </span>
                        </a>
                    </li>
                    <li className="">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            <i className="material-icons">chat_bubble_outline</i>
                            <span className="count visible-xs visible-sm">3</span>
                            <span className="visible-md visible-lg">
                                Mesajlar <span>3 yeni</span>
                            </span>
                        </a>
                    </li>
                    <li className="">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            <img src={avatar} alt=""/>
                            <span className="visible-md visible-lg">
                                Tuncay Yıldırtan <span>Admin</span>
                            </span>
                            <span className="caret visible-md visible-lg"></span>
                        </a>
                        <ul className="dropdown-menu " role="menu">
                            <li><a><i className="material-icons">compare_arrows</i> Şifre Değişikliği</a></li>
                            <li><a><i className="material-icons">build</i> Kullacıyı Ayarları</a></li>
                            <li><a><i className="material-icons">exit_to_app</i> Oturum Kapat</a></li>
                            <li><a onClick={()=> changeLang('tr')}><i className="material-icons">exit_to_app</i> TR</a></li>
                            <li><a onClick={()=> changeLang('en')}><i className="material-icons">exit_to_app</i> EN</a></li>
                        </ul>
                    </li>

                </ul>
            </div>
        )
    }
}

export default Header;
