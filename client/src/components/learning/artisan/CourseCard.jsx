import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Switch,
  Chip,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import SinglePageCourse from "./SinglePageCourse";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCourseData } from "../../../redux/Courselice";

import api from "../../pages/api";
import axios from "axios";

function CourseCard(props) {
  const { id, course } = props;
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setCourseData({ id, course }));
  };

  const [Changed, setChanged] = useState(course.published);
  useEffect(() => {
    const published = async () => {
      try {
        await axios
          .put(`http://localhost:5000/courses/publish/${id}`, {
            Changed,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("published", res.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    published();
  }, [Changed]);
  return (
    <>
      <Card className="mt-6 w-[24rem] border-solid border-[1px] border-gray-500/20">
        <CardHeader color="blue-gray" className=" h-48">
          <img
            src={course.image?.path}
            alt="card"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {course.title}
          </Typography>
          <Chip
            variant="ghost"
            className="w-fit"
            color={
              course.category.name === "Wicker"
                ? "green"
                : course.category.name === "leather"
                ? "orange"
                : course.category.name === "The dinaderie"
                ? "red"
                : course.category.name === "carpets"
                ? "orange"
                : course.category.name === "Ceramics and pottery"
                ? "purple"
                : "gray"
            }
            value={course.category.name}
          />
        </CardBody>
        <CardFooter className="pt-0 flex items-center justify-between">
          <Link to="/profile/course/lessons">
            <Button
              ripple={false}
              variant="outlined"
              className="capitalize"
              size="sm"
              onClick={handleCardClick}
            >
              Add lesson
            </Button>
          </Link>
          {/* className="h-full w-full checked:bg-[#2ec946]" */}
          <div className="flex justify-center ">
            <Switch
              ripple={false}
              className="mr-3"
              color="green"
              onChange={() => setChanged(!Changed)}
              defaultChecked={Changed}
            />
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                {!Changed ? (
                  <>
                    <ExclamationTriangleIcon className="h-5 w-5 font-bold text-yellow-600 ml-1" />
                    <Typography
                      variant="small"
                      color="yellow"
                      className="font-bold"
                    >
                      <span className="capitalize">not published</span>
                    </Typography>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-5 w-5 font-bold text-[#2ec946] ml-1" />
                    <Typography
                      variant="small"
                      className="font-bold text-[#2ec946]"
                    >
                      published
                    </Typography>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default CourseCard;
