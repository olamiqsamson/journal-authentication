//crud

const Jobs = require("../models/job");

const getJournals = async (req, res) => {
  try {
    const jobs = await Jobs.find({ createby: req.user.userId });
    res.status(200).json({ noOfJobs: jobs.length, jobs });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getJournal = async (req, res) => {
  //get access to the user, parameter

  const {
    user: { userId },
    params: { jobId },
  } = req;
  try {
    const job = await Jobs.findOne({createdBy: userId, _id: jobId});
    if (!job) {
      return res.status(404).json({success: false, message: `job with the ${jobId} not found`})
    }

    res.status(200).json({job})
  } catch (error) {

  }
};

const createJournal = async (req, res) => {
  //company,position,createdBy
  const { company, position } = req.body;
  req.body.createdBy = req.user.userId;

  if (!company || !position) {
    return res.status(400).json({
      success: false,
      message: "please provide neccesary information",
    });
  }

  try {
    const job = await Jobs.create(req.body);
    res.status(201).json({ success: true, job });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const updateJournal = async (req, res) => {
  const {
    user: { userId },
    params: { jobId },
  } = req;
  try {
    const job = await Jobs.findOneAndUpdate({createdBy: userId, _id: jobId});
    if (!job) {
      return res.status(404).json({success: false, message: `job with the ${jobId} has been updated`})
    }

    res.status(200).json({job})
  } catch (error) {

  }

};

const deleteJournal = async (req, res) => {
  const {
    user: { userId },
    params: { jobId },
  } = req;
  try {
    const job = await Jobs.findOneAndRemove({createdBy: userId, _id: jobId});
    if (!job) {
      return res.status(404).json({success: true, message: `job with the ${jobId} has been deleted`})
    }

    res.status(200).json({job})
  } catch (error) {

  }};

module.exports = {
  getJournal,
  getJournals,
  createJournal,
  deleteJournal,
  updateJournal,
};
