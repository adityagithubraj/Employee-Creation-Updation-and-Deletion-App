
import express from 'express';
import EmployeeModel, { Employee } from '../model/model';

const router = express.Router();

//................GET LOG...............//

// router.get("/logs",async(req,res)=>{
//     try {
//         const logs=await logsModel.aggregate([{$sort:{"timestamp":-1}},{$limit:30}])
//         res.json({logs})
//     } catch (error) {
//         console.log(error)
//         res.json({msg:error})
//     }
// })



//....................GET EMPLOYEES................//
router.get('/employees', async (req, res) => {
    try {
      const employees: Employee[] = await EmployeeModel.find({ isDeleted: false });
      res.status(200).send({employees});
    } catch (error) {
        res.status(500).send("error");
    }
  });

  //.....................POST EMPLOYEES...................//
router.post('/employees', async (req, res) => {
  try {
    const { name, title, department, annualSalary } = req.body;
    const employee: Employee = new EmployeeModel({
      name,
      title,
      department,
      annualSalary,
    });
    await employee.save();
    res.status(201).send({ msg: "Employee Added" });
  } catch (error) {
    res.status(400).send("error");
  }
});

//.....................UPDATE EMPLOYEES...................//

router.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {name, title, department, annualSalary } = req.body;
    const employee: Employee | null = await EmployeeModel.findByIdAndUpdate(
      id,
      {  name,
        title,
        department,
        annualSalary,
      },
      { new: true }
    );
    if (!employee) {
        return res.status(404).send({ msg: 'Employee not found' });
    } else {
        res.status(201).send({ msg: "Employee Details Edited" });
    }
  } catch (error) {
    res.status(400).send("error");
  }
});


//.....................DELETE EMPLOYEES...................//

router.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee: Employee | null = await EmployeeModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!employee) {
        return res.status(404).send({ msg: 'Employee not found' });
    } else {
        res.status(201).send({ msg: "Employee Deleted Sucessfully" })
    }
  } catch (error) {
    res.status(500).send("error")
  }
});

export { router };
