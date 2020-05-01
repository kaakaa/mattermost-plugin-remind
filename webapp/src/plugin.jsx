import {FormattedMessage} from 'react-intl';

import en from 'i18n/en.json';

import {id as pluginId} from './manifest';

import {
    postDropdownMenuAction,
} from './actions';

function getTranslations(locale) {
    switch (locale) {
    case 'en':
        return en;
    }
    return {};
}

export default class RemindPlugin {
    initialize(registry, store) {
        const {id, rootRegisterMenuItem} = registry.registerPostDropdownSubMenuAction(
            <FormattedMessage
                id='submenu.message'
                defaultMessage='Remind me about this'
            />
        );

        const menus = [
            {id: 'submenu.20min',       defaultMessage: 'In 20 minutes'},
            {id: 'submenu.1hr',         defaultMessage: 'In 1 hour'},
            {id: 'submenu.3hr',         defaultMessage: 'In 3 hours'},
            {id: 'submenu.tomorrow',    defaultMessage: 'Tomorrow'},
            {id: 'submenu.nextweek',    defaultMessage: 'Next week'}
        ];
        menus.forEach(menu => {
            rootRegisterMenuItem(
                <FormattedMessage
                    id={menu.id}
                    key={menu.id}
                    defaultMessage={menu.defaultMessage}
                />,
                (postId) => store.dispatch(postDropdownMenuAction(postId, menu.id))
            );
        });

        registry.registerTranslations(getTranslations);
    }

    uninitialize() {
        //eslint-disable-next-line no-console
        console.log(pluginId + '::uninitialize()');
    }
}
