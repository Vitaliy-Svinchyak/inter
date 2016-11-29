/**
 * Created by opiru on 05.11.2016.
 */
class MainMenuComponentController {

    /**
     *
     * @param $mdSidenav
     * @param $location
     */
    constructor($mdSidenav, $location) {
        this.$mdSidenav = $mdSidenav;
        this.$location = $location;

        this.isHome = true;
        this.isMyPage = false;

        this.menuItemsMain = [
            {
                url: '/main/php',
                icon: '/images/php.png',
                alt: 'PHP',
                text: 'PHP',
            },
            {
                url: '/main/js',
                icon: '/images/js.png',
                alt: 'JS',
                text: 'JS',
            },
            {
                url: '/main/mysql',
                icon: '/images/mysql.png',
                alt: 'MYSQL',
                text: 'MYSQL',
            },
            {
                url: '/main/css',
                icon: '/images/css3.png',
                alt: 'CSS',
                text: 'CSS',
            },
            {
                url: '/main/html',
                icon: '/images/html.png',
                alt: 'HTML',
                text: 'HTML',
            },
        ];
        this.menuItemsMy = [
            {
                url: '/my/create-question',
                text: 'Создать вопрос',
            },
        ];
        this.detectPage();
    }


    openMenu() {
        this.$mdSidenav('left').toggle();
    }

    /**
     * Goes to the url and closes menu
     * @param to
     */
    go(to) {
        this.$location.url(to);
        this.$mdSidenav('left').toggle();
    }

    /**
     * Detects pages and changes menu items
     */
    detectPage() {
        let path = this.$location.path();
        if (path.substr(0, 4) === '/my/'){
            this.setMyPageSettings();
        }
        else{
            this.setHomePageSettings();
        }
    }

    setMyPageSettings() {
        this.menuItems = this.menuItemsMy;
        this.isHome = false;
        this.isMyPage = true;
    }

    goMyPage() {
        this.setMyPageSettings();
        this.$location.url('/my/page');
    }

    setHomePageSettings() {
        this.menuItems = this.menuItemsMain;
        this.isHome = true;
        this.isMyPage = false;
    }

    goHomeNigger() {
        this.setHomePageSettings();
        this.$location.url('/main/php');
    }
}

const MainMenuDefinition = {
    templateUrl: '/components/main-menu/templates/menu.html',

    controller: MainMenuComponentController
};

angular.module('app').component('mainMenu', MainMenuDefinition);