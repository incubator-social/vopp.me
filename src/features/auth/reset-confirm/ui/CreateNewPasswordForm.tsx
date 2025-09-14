'use client';

type Props = { token?: string };

export function CreateNewPasswordForm({ token }: Props) {
  return <div>Здесь будет форма создания нового пароля (token: {token})</div>;
}
