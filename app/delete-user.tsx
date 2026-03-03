'use client';
import { deleteUserAction } from './api/users/actions';

export default function DeleteForm() {
  return (
    <form
      action={deleteUserAction}
      className="p-5 border border-red-700 inline-flex gap-4 ml-5"
    >
      <input
        placeholder="id пользователя"
        name="userId"
        className="border border-red-700"
      />
      <button className="border border-red-700" type="submit">
        Удалить
      </button>
    </form>
  );
}
