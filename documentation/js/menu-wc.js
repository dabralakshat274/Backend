'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">second documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' : 'data-bs-target="#xs-controllers-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' :
                                            'id="xs-controllers-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' : 'data-bs-target="#xs-injectables-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' :
                                        'id="xs-injectables-links-module-AppModule-8a751dddbd7531591694bf7f20a310fca15ef64c21150f3f50fde5d030545607d66e273b6131907a41a4767e9290df2bd666ac3094348da4fb44f93af2c070a1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' :
                                            'id="xs-controllers-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' :
                                        'id="xs-injectables-links-module-AuthModule-3b291ad7bcfa0e07b914e4ecf61fccfbf0a06dbb6ace0f79736e38beb16c3bf75bc5ee888eaa7de2a8b810e1216f3bcf08d51ea2da8d49bd9edd92657af9a2c6"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestModule.html" data-type="entity-link" >TestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' : 'data-bs-target="#xs-controllers-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' :
                                            'id="xs-controllers-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' : 'data-bs-target="#xs-injectables-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' :
                                        'id="xs-injectables-links-module-TestModule-5e9d1ccd9eace3065ab0fec72228a2428c404134f414ba220e927839443cd9e907f7c374a9a3a7b2aeed999142aceed539e910a2806436e574b358a5878606e0"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-f83b8563cf1510d6e5d5a68225a36da71283bd93017096bd86ec4d8e98e2a710d3a7e6ef67109af3e610df5a3690e23223b29cd6315baf021b0cc1b280268ae2"' : 'data-bs-target="#xs-controllers-links-module-UserModule-f83b8563cf1510d6e5d5a68225a36da71283bd93017096bd86ec4d8e98e2a710d3a7e6ef67109af3e610df5a3690e23223b29cd6315baf021b0cc1b280268ae2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f83b8563cf1510d6e5d5a68225a36da71283bd93017096bd86ec4d8e98e2a710d3a7e6ef67109af3e610df5a3690e23223b29cd6315baf021b0cc1b280268ae2"' :
                                            'id="xs-controllers-links-module-UserModule-f83b8563cf1510d6e5d5a68225a36da71283bd93017096bd86ec4d8e98e2a710d3a7e6ef67109af3e610df5a3690e23223b29cd6315baf021b0cc1b280268ae2"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/usersModule.html" data-type="entity-link" >usersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' : 'data-bs-target="#xs-controllers-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' :
                                            'id="xs-controllers-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' : 'data-bs-target="#xs-injectables-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' :
                                        'id="xs-injectables-links-module-usersModule-a3e2efde5a96f9980562b8e895da785d1b17f2b38a1937c234c8bd64968446d33ab246f1a1b14aa3a6766777f90548c7cb2536283ae331b1726455157be2299e"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TestController.html" data-type="entity-link" >TestController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostmetaOptionsDto.html" data-type="entity-link" >CreatePostmetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});