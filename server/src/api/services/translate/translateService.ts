export const translate = async (lang: string, key: string) => {
    let word = '';
    switch (lang) {
        case 'ua':
            word = ua.get(key);
            break;
        case 'ru':
            word = ru.get(key);
            break;
        case 'en':
            word = en.get(key);
            break;
    }
    console.log(lang);
    console.log(key);
    console.log(word);
    return word;
};

const en: Map<string, string> = new Map();
en.set('createdSuccess', 'Created successful');
en.set('updatedSuccess', 'Updated successful');
en.set('passwordChangedSuccess', 'Password changed successful');
en.set('deletedSuccess', 'Deleted successful');
en.set('socialDeleted', 'Social account was unbinded!');
en.set('wrongEmailOrPassword', 'Wrong email or password');
en.set('dontHavePermissions', 'User does not have permission level!');
en.set('userNotExist', 'User doesn\'t exist');
en.set('roleNotExist', 'Role doesn\'t exist');
en.set('permissionNotExist', 'Permission doesn\'t exist');
en.set('blockUser', 'User was blocked on 5 min');

const ua: Map<string, string> = new Map();
ua.set('createdSuccess', 'Успішно створено');
ua.set('updatedSuccess', 'Успішно обновлено');
ua.set('passwordChangedSuccess', 'Успішно змінено пароль');
ua.set('deletedSuccess', 'Успішно видалено');
ua.set('socialDeleted', 'Успішно видалено соціальну мережу');
ua.set('wrongEmailOrPassword', 'Невірний пароль або email');
ua.set('dontHavePermissions', 'Заборонено в доступі');
ua.set('userNotExist', 'Користувача не існує');
ua.set('roleNotExist', 'Ролі не існує');
ua.set('permissionNotExist', 'Дозволу не існує');
ua.set('blockUser', 'Користувача було заблоковано на 5 хв');

const ru: Map<string, string> = new Map();
ru.set('createdSuccess', 'Успешно создано');
ru.set('updatedSuccess', 'Успешно обновлено');
ru.set('passwordChangedSuccess', 'Успешно изменен пароль');
ru.set('deletedSuccess', 'Успешно удалено');
ru.set('socialDeleted', 'Успешно удалена социальная сеть');
ru.set('wrongEmailOrPassword', 'Неверный пароль или email');
ru.set('dontHavePermissions', 'Запрещено в доступе');
ru.set('userNotExist', 'Пользователя не существует');
ru.set('roleNotExist', 'Роли не существует');
ru.set('permissionNotExist', 'Разрешение не существует');
ru.set('blockUser', 'Пользователь бил заблокирован на 5 мин');
