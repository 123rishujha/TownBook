import { useGetAllLibrariesQuery } from "../MemberQuery";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, LibraryBig } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AllLibraries = () => {
  const { data:libraries  } = useGetAllLibrariesQuery();
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Libraries</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        { libraries?.map((lib) => (
          <Card key={lib._id} className="cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300" onClick={()=>navigate(`library/${lib._id}`)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-library-accent p-3 rounded-full">
                  <LibraryBig className="text-library-primary w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{lib.name}</h2>
                  <p className="text-sm text-gray-500">
                    Joined: {moment(lib.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <Mail className="w-4 h-4" />
                <span>{lib.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllLibraries;
