import { Movement } from "../entities";

import { Request } from "express";
import { moveRepository } from "../repositories";
import { ErrorHandler } from "../errors";

class MoveService {
  moveCreator = async (req: Request): Promise<any> => {
    const body = req.body;

    const move: Movement = await moveRepository.save({
      ...body,
      requisition: body.requisitionId,
    });

    return move;
  };

  movementsLoader = async (req: Request) => {
    let movements: Movement[] = await moveRepository.all();
    movements = movements.sort((a, b) =>
      a.moveId > b.moveId ? -1 : a.moveId < b.moveId ? 1 : 0
    );
    return {
      status: 200,
      movements: movements,
    };
  };

  selectedLoader = async (req: Request) => {
    const selected: Movement[] = await moveRepository.selected({
      requisitionId: req.params.requisitionId,
    });
    return { status: 200, selected: selected };
  };

  moveLoader = async (req: Request) => {
    const move: Movement = await moveRepository.findOne({
      moveId: req.params.moveId,
    });
    return {
      status: 200,
      move: move,
    };
  };

  moveEditor = async (req: Request) => {
    const move: Movement = await moveRepository.findOne({
      moveId: req.params.moveId,
    });

    if (!move) {
      throw new ErrorHandler(404, "Movement not found!");
    }

    const body = req.body;

    const moveUpdated = {
      ...move,
      moveQuantity: body.moveQuantity,
      moveUnit: body.moveUnit,
    };

    await moveRepository.update(body.moveId, moveUpdated);

    return {
      status: 200,
      move: moveUpdated,
    };
  };

  moveDeletor = async (req: Request) => {
    const move: Movement = await moveRepository.findOne({
      moveId: req.params.moveId,
    });

    if (!move) {
      throw new ErrorHandler(404, "User not found!");
    }

    await moveRepository.delete(req.params.moveId);

    return {
      status: 200,
      message: "Movement deleted",
    };
  };
}

export default new MoveService();
