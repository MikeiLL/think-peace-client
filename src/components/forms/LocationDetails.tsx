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
  const [isSubmitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const [comingFromAddress, setComingFromAddress] = useState();
  const [sendingToAddress, setSendingToAddress] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const defaultOptions = {
    from: "somewhere",
    to: "Earth",
  };

  const submitHandler = async (e: React.ChangeEvent<any>) => {
    // Not sure why this is an async function.
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      from: comingFromAddress || {label: defaultOptions.from},
      to: sendingToAddress || {label: defaultOptions.to},
      hashTag,
    };

    console.log("payload", payload);

    axios
      .post(endpoints.wish.CREATE, payload)
      .then((response) => {
        //@ts-ignore
        window.refreshWishes();
        //@ts-ignore
        window.searchParams.set("pin", response.data._id);
        //@ts-ignore
        navigate("/wishes?" + window.searchParams);
      })
      .catch((error) => {
        console.log("Err", error);
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.error);
        }
      });

  };


  return (
    <div>

      <form onSubmit={submitHandler}>

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
            {
            // @ts-ignore
            window.wishHashtags.map(
              (tag:any) => (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
        </section>

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
              placeholder: defaultOptions.from,
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
              placeholder: defaultOptions.to,
            }}
          />
        </section>

        {errorMessage && <p className="m-auto text-red-500 text-lg text-center mt-1 w-full max-w-xs bg-white border-red-500 rounded">{errorMessage}</p>}

        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            id="sendWish"
            className="btn bg-white hover:bg-white focus:bg-white text-gray-700 mt-3 mx-auto rounded-full px-8">
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};
