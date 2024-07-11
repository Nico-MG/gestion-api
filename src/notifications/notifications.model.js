import db from "../core/database/connection.js";

export const getAllNotifications = async () => {
  return await db.notifications.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
};

export const getNotification = async (id, idp) => {
  return db.notifications.findUnique({
    where: {
      notification_id: id,
    },
    include: {
      products: true,
    },
  });
};

export const createNotifications = async (data) => {
  return await db.notifications.create({
    data,
  });
};

export const deleteNotifications = async (id) => {
  return await db.notifications.delete({
    where: {
      notification_id: id,
    },
  });
};
