import { hashPassword, comparePassword } from '../../../api/services/password-service';

describe('Test Password service', () => {
    const password = '12345';
    test('Hash & Compare password success', async () => {
        const passwordHash = await hashPassword(password);
        const equal = await comparePassword(password, passwordHash);
        expect(equal).toBeTruthy();
    });

    test('Hash & Compare password error', async () => {
        const passwordHash = await hashPassword(password);
        const equal = await comparePassword(password, passwordHash + 'error');
        expect(equal).toBeFalsy();
    });
});
