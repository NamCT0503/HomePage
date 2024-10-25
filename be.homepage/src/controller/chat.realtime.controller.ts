import { Request, Response } from "express";
import { userRequest } from "../middleware/validate.user.middleware";
import { createGroupChat, deleteGroupChat, getGroupChatById, updateGroupChat } from "../service/groupchat.service";
import { deleteChat, getAllChatInGC, getChatById } from "../service/chat.services";
import { createViewer } from "../service/viewer.services";

//GroupChat Model
export const controller_getGCById = async(
    req: userRequest,
    res: Response
) => {
    const sub = req.user.sub;
    const id = req.params.id
    res.json(await getGroupChatById(sub, id));
}

export const controller_createGC = async(
    req: userRequest,
    res: Response
) => {
    const payload = req.user;
    const data = req.body;
    res.json(await createGroupChat(payload, data));
}

export const controller_updateGC = async(
    req: userRequest,
    res: Response
) => {
    const data = {
        ...req.body,
        avatar: req.file
    }
    res.json(await updateGroupChat(data, req.body.isUpate));
}

export const controller_deleteGC = async(
    req: userRequest,
    res: Response
) => {
    const id = req.params.id;
    const sub = req.user.sub;
    res.json(await deleteGroupChat(id, sub));
}

//Chat Model
export const controller_getAllChatInGC = async(
    req: userRequest,
    res: Response
) => {
    const sinceday = parseInt(req.params.sinceday);
    const sender = parseInt(req.params.sender);
    const revicer = parseInt(req.params.revicer);
    const grchatid = req.params.grchatid;

    res.json(await getAllChatInGC(sinceday, sender, revicer, grchatid));
}

export const controller_getInfoChatMessage = async(
    req: userRequest,
    res: Response
) => {
    const idchat = req.params.idchat;
    const sub = req.user.sub;
    res.json(await getChatById(parseInt(idchat), sub));
}

export const controller_deleteChat = async(
    req: userRequest,
    res: Response
) => {
    const id = req.body.id;
    const sub = req.body.sub;
    const isMessage = req.body.isMessage;
    res.json(await deleteChat(id, sub, isMessage))
}

//Viewer Model
export const controller_userSeenMessage = async(
    req: userRequest,
    res: Response
) => {
    const idchat = req.body.idchat;
    const sub = req.user.sub;
    res.json(await createViewer(idchat, sub));
}