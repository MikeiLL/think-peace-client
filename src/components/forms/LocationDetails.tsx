import { useEffect, useState } from "react";
// import { useGeocode } from "hooks/useGeocode";
import axios from "axios";
import { endpoints } from "constants/endpoints";
import {useNavigate} from "react-router-dom";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const LocationDetails = () => {

  const [hashTag, setHashTag] = useState("#peace");

  const [sendToState, setSendToState]: any = useState(null);
  const [sendToCity, setSendToCity] = useState("");

  const navigate = useNavigate();

  const [comingFromAddress, setComingFromAddress] = useState();
  const [sendingToAddress, setSendingToAddress] = useState();
  const submitHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const payload = {
      from: comingFromAddress,
      to: sendingToAddress,
      hashTag,
    };

    console.log("payload", payload);

    axios
      .post(endpoints.wish.CREATE, payload)
      .then((response) => {
        console.log(response);
        //@ts-ignore
        window.refreshWishes();
      })
      .catch((error) => {
        console.log("Err", error);
      });

    navigate("/wishes");
  };


  return (
    <div>

      <form onSubmit={submitHandler}>

        <section className="my-2 flex flex-col items-center">
          <label
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            From
          </label>
          <GooglePlacesAutocomplete
            autocompletionRequest={{
              types: ["(regions)"],
            }}
            selectProps={{
              value: comingFromAddress,
              onChange: setComingFromAddress,
              className: "mt-1 w-full max-w-xs text-gray-700",
              noOptionsMessage: () => "No results found. Is that a place?",
            }}
          />
        </section>

        <section className="my-2 flex flex-col items-center">
          <label
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            Send your wish to
          </label>
          <GooglePlacesAutocomplete
            autocompletionRequest={{
              types: ["(regions)"],
            }}
            selectProps={{
              value: sendingToAddress,
              onChange: setSendingToAddress,
              className: "mt-1 w-full max-w-xs bg-white text-gray-700",
              noOptionsMessage: () => "No results found. Is that a place?",
            }}
          />
        </section>

        <section className="my-2 flex flex-col items-center">
          <label
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            What did you wish for?
          </label>
          <select
            className="select mt-1 w-full max-w-xs bg-white text-gray-700"
            value={hashTag}
            onChange={(e) => setHashTag(e.target.value)}
          >
            {["#peace", "#healing", "#hope", "#faith", "#friendship", "#gratitude", "#love", "#prayers", "#propserity", "#support", "#respect"].map(
              (tag) => (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
        </section>

        <div className="flex justify-center">
          <button className="btn bg-white hover:bg-white focus:bg-white text-gray-700 mt-3 mx-auto rounded-full px-8">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
