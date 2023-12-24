import { Registration } from "../modules/registration";
import { Chat } from "../modules/chat";
import { MainPage } from "../modules/mainPage";
import { Account } from "../modules/account";
import { Error500 } from "../modules/500";
import { Error400 } from "../modules/404";
import { Authorization } from "../modules/authorization";
import { onLinkClick } from "./onLinkClick";
import { regOnSubmit } from "../modules/registration/regOnSubmit";
import { authOnSubmit } from "../modules/authorization/authOnSubmit";
import { ChangePassword } from "../modules/changePassword";
import { changePasOnSubmit } from "../modules/changePassword/changePasOnSubmit";
import { Router } from "./Router";


const router = new Router("#content");

router
  .use("/", true, MainPage, {
    events: {
      click: onLinkClick
    }
  })
  .use('/messenger', true, Chat)
  .use('/sign-up', false, Registration, {
    events: {
      submit: regOnSubmit,
      click: onLinkClick
    }
  })
  .use('/sign-in', false, Authorization, {
    events: {
      submit: authOnSubmit,
      click: onLinkClick
    }
  })
  .use('/settings', true, Account, {
    events: {
      click: onLinkClick
    }
  })
  .use('/change-password', true, ChangePassword, {
    events: {
      click: onLinkClick,
      submit: changePasOnSubmit,
    }
  })
  .use('/500', false, Error500, {
    events: {
      click: onLinkClick
    }
  })
  .use('/404', false, Error400, {
    events: {
      click: onLinkClick
    }
  })
  .start()


export default router
