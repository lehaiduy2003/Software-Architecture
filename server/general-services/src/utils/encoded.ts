import bcrypt from 'bcrypt';

export const encode = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Lỗi so sánh mật khẩu:', error);
        return false;
    }
};