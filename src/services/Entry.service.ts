import { Request } from "express";
import { entryRepository } from "../repositories";
import { Entry } from "../entities";
import { ErrorHandler } from "../errors";

class EntryService {
  entryCreator = async (req: Request): Promise<any> => {
    const body = req.body;
    const fecha = new Date(body.entryDate);

    const entrada: Entry = await entryRepository.save({
      ...body,
      entryDate: fecha,
    });

    return entrada;
  };

  entriesLoader = async (req: Request) => {
    let entradas: Entry[] = await entryRepository.all();
    entradas = entradas.sort((a, b) =>
      a.entryId > b.entryId ? -1 : a.entryId < b.entryId ? 1 : 0
    );
    return {
      status: 200,
      entradas: entradas,
    };
  };

  entryLoader = async (req: Request) => {
    const entrada: Entry = await entryRepository.findOne({
      entryId: req.params.entryId,
    });
    return { status: 200, entrada: entrada };
  };

  entryEditor = async (req: Request) => {
    const entrada: Entry = await entryRepository.findOne({
      entryId: req.params.entryId,
    });
    const entryUpdated = {
      ...entrada,
      invoice: req.body.invoice,
      seller: req.body.seller,
      isReceived: req.body.isReceived,
    };
    await entryRepository.save(entryUpdated);
    return {
      status: 200,
      entrada: entryUpdated,
    };
  };

  entryDeletor = async (req: Request) => {
    const entrada: Entry = await entryRepository.findOne({
      entryId: req.params.entryId,
    });

    if (!entrada) {
      throw new ErrorHandler(404, "Entry not found");
    }

    await entryRepository.delete(req.params.entryId);

    return {
      status: 200,
      message: "Entry deleted",
    };
  };
}

export default new EntryService();
